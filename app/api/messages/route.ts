import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import redis from '@/lib/redis';
import logger from '@/lib/logger';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    logger.warn('GET /api/messages: Missing roomId');
    return NextResponse.json({ error: 'Room ID required' }, { status: 400 });
  }

  const cacheKey = `chat:messages:${roomId}`;

  // Try to fetch from Redis
  try {
    const cachedMessages = await redis.get(cacheKey);
    if (cachedMessages) {
      logger.debug(`GET /api/messages: Cache hit for room ${roomId}`);
      return NextResponse.json({ messages: JSON.parse(cachedMessages) });
    }
  } catch (err) {
    logger.error(err, `GET /api/messages: Redis error for room ${roomId}`);
  }

  // If not in Redis, fetch from Supabase
  logger.info(`GET /api/messages: Cache miss for room ${roomId}, fetching from Supabase`);
  const { data: messages, error } = await supabase
    .from('messages')
    .select('*')
    .eq('session_id', roomId)
    .order('created_at', { ascending: true });

  if (error) {
    logger.error(error, `GET /api/messages: Supabase error for room ${roomId}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Cache in Redis
  try {
    await redis.set(cacheKey, JSON.stringify(messages), 'EX', 3600); // Cache for 1 hour
  } catch (err) {
    logger.error(err, `GET /api/messages: Redis cache set error for room ${roomId}`);
  }

  return NextResponse.json({ messages });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { session_id, sender_id, first_name, body: messageBody } = body;

  if (!session_id || !sender_id || !messageBody) {
    logger.warn('POST /api/messages: Missing required fields');
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase.from('messages').insert([{
    session_id,
    sender_id,
    first_name,
    body: messageBody
  }]).select().single();

  if (error) {
    logger.error(error, `POST /api/messages: Supabase error for room ${session_id}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Invalidate Redis cache
  try {
    const cacheKey = `chat:messages:${session_id}`;
    await redis.del(cacheKey);
    logger.info(`POST /api/messages: Cache invalidated for room ${session_id}`);
  } catch (err) {
    logger.error(err, `POST /api/messages: Redis cache invalidation error for room ${session_id}`);
  }

  return NextResponse.json({ message: data });
}
