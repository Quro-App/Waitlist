// @ts-ignore
import { NextRequest, NextResponse } from 'next/server';
import { getStats } from '@/lib/db';
import crypto from 'crypto';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Helper function for secure string comparison (prevents timing attacks)
function secureCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  
  // Use crypto.timingSafeEqual to prevent timing attacks
  try {
    const bufA = Buffer.from(a, 'utf8');
    const bufB = Buffer.from(b, 'utf8');
    
    // Ensure both buffers are the same length to use timingSafeEqual
    const maxLength = Math.max(bufA.length, bufB.length);
    const paddedA = Buffer.alloc(maxLength, 0);
    const paddedB = Buffer.alloc(maxLength, 0);
    
    bufA.copy(paddedA);
    bufB.copy(paddedB);
    
    return crypto.timingSafeEqual(paddedA, paddedB);
  } catch (error) {
    console.error('Error in secure comparison:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication with proper error handling
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      );
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Get admin password from environment variables
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    // Ensure admin password is set
    if (!adminPassword || adminPassword === 'your-secure-password-here') {
      console.error('Admin password not properly configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Secure password comparison
    if (!secureCompare(token, adminPassword)) {
      // Add a small delay to further prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 100));
      
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get stats with error handling
    try {
      const stats = getStats();
      return NextResponse.json(stats);
    } catch (statsError) {
      console.error('Error retrieving stats:', statsError);
      return NextResponse.json(
        { error: 'Failed to retrieve statistics' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in admin stats API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

