import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

type EnquiryPayload = {
  name: string
  email: string
  phone?: string
  occasion: string
  deliveryDate: string
  message: string
  contactMethod?: string
  budget?: string
  timeframe?: string
  source?: string
}

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

  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ enquiries: data }, { status: 200 })
}

export async function POST(req: NextRequest) {
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

  const body = (await req.json()) as EnquiryPayload

  const deliveryDate = body.deliveryDate ? new Date(body.deliveryDate) : null
  if (!deliveryDate || Number.isNaN(deliveryDate.getTime())) {
    return NextResponse.json({ error: "Invalid deliveryDate" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("enquiries")
    .insert({
      name: body.name,
      email: body.email,
      phone: body.phone ?? null,
      occasion: body.occasion,
      delivery_date: deliveryDate.toISOString().slice(0, 10),
      message: body.message,
      status: "new",
      notes: "",
      contact_method: body.contactMethod ?? null,
      budget: body.budget ?? null,
      timeframe: body.timeframe ?? null,
      source: body.source ?? null,
    })
    .select("*")
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ enquiry: data }, { status: 201 })
}

