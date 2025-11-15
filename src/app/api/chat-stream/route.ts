import { getModelById } from '@/lib/ai-models';
import { checkRateLimit } from '@/lib/rate-limiter';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge';

// Initialize AI clients
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
});

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy-key',
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || 'dummy-key');

export async function POST(req: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const { messages, modelId = 'gpt-4-turbo' } = await req.json();

    const model = getModelById(modelId);
    if (!model) {
      return new Response(JSON.stringify({ error: 'Model not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get AI response based on provider
    let responseText = '';

    if (model.provider === 'OpenAI') {
      const completion = await openai.chat.completions.create({
        model: model.model,
        messages,
        stream: false,
      });
      responseText = completion.choices[0]?.message?.content || 'No response';
    } else if (model.provider === 'Anthropic') {
      const response = await anthropic.messages.create({
        model: model.model,
        max_tokens: 4096,
        messages: messages.map((msg: { role: string; content: string }) => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content,
        })),
      });
      responseText = response.content[0]?.text || 'No response';
    } else if (model.provider === 'Google') {
      const genModel = genAI.getGenerativeModel({ model: model.model });
      const lastMessage = messages[messages.length - 1];
      const result = await genModel.generateContent(lastMessage.content);
      responseText = result.response.text() || 'No response';
    } else {
      throw new Error('Unsupported provider');
    }

    return new Response(JSON.stringify({ message: responseText }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error: unknown) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    return new Response(
      JSON.stringify({
        error: 'Failed to get AI response',
        message: errorMessage,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
