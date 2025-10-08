// @ts-ignore
import { NextResponse } from 'next/server';
import { getEmailCount, getVisitCount } from '@/lib/db';

export async function GET() {
  try {
    // Fetch stats with error handling
    let emailCount: number;
    let visitCount: number;
    
    try {
      emailCount = getEmailCount();
    } catch (error) {
      console.error('Error fetching email count:', error);
      emailCount = 0;
    }
    
    try {
      visitCount = getVisitCount();
    } catch (error) {
      console.error('Error fetching visit count:', error);
      visitCount = 0;
    }

    return NextResponse.json({
      emailCount,
      visitCount,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', emailCount: 0, visitCount: 0 },
      { status: 500 }
    );
  }
}

