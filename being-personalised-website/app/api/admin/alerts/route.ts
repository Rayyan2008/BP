import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export async function GET(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data: { user }, error: userErr } = await supabase.auth.getUser()
  if (userErr || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Admin check
  const { data: isAdmin, error: adminErr } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle()

  if (adminErr || !isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  // Single alert row; prefer active, else first
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ alert: data?.[0] ?? null }, { status: 200 })
}

export async function PATCH(req: NextRequest) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  const { data: { user }, error: userErr } = await supabase.auth.getUser()
  if (userErr || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  // Admin check
  const { data: isAdmin, error: adminErr } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle()

  if (adminErr || !isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const body = (await req.json()) as {
    message: string
    isActive: boolean
    backgroundColor: string
    textColor: string
  }

  // Upsert latest single row
  const { data: existing, error: fetchErr } = await supabase
    .from("alerts")
    .select("id")
    .order("updated_at", { ascending: false })
    .limit(1)

  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 })

  if (existing && existing.length > 0) {
    const { data, error } = await supabase
      .from("alerts")
      .update({
        message: body.message,
        is_active: body.isActive,
        background_color: body.backgroundColor,
        text_color: body.textColor,
      })
      .eq("id", existing[0].id)
      .select("*")
      .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ alert: data }, { status: 200 })
  }

  const { data, error } = await supabase
    .from("alerts")
    .insert({
      message: body.message,
      is_active: body.isActive,
      background_color: body.backgroundColor,
      text_color: body.textColor,
    })
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ alert: data }, { status: 200 })
}

