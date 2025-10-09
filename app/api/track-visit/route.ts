// @ts-ignore
import { NextRequest, NextResponse } from 'next/server';
import { trackVisit } from '@/lib/db';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Get IP address with proper sanitization
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded 
      ? forwarded.split(',')[0].trim() 
      : request.headers.get('x-real-ip')?.trim() || 'unknown';
    
    // Get user agent with sanitization
    const userAgent = request.headers.get('user-agent')?.trim() || 'unknown';

    // Track the visit
    try {
      trackVisit(ip, userAgent);
    } catch (dbError) {
      console.error('Database error while tracking visit:', dbError);
      // Continue execution - don't fail the request for tracking errors
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error tracking visit:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track visit' }, 
      { status: 500 }
    );
  }
}

