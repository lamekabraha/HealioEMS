import { NextResponse, NextRequest } from "next/server";
export async function get(request: Request) {
    const results = {
        message: 'accounts api'
    }

    return NextResponse.json(results)
}