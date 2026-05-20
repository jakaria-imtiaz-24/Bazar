
import { createFileRoute } from '@tanstack/react-router';
const SPREADSHEET_ID = '1gD77N6AW89IphsdhfBbTUAOnKzqgmplkUoncn-a3LL8';
const SHEET_NAME = 'Sheet1';
const GATEWAY_URL = 'https://connector-gateway.lovable.dev/google_sheets/v4';
export const Route = createFileRoute('/api/public/order')({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }),
      POST: async ({ request }) => {
        const cors = {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        };
        try {
          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
          if (!LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
            return new Response(JSON.stringify({ error: 'Sheets not configured' }), { status: 500, headers: cors });
          }
          const body = await request.json() as {
            orderNo: string; date: string; name: string; phone: string;
            district: string; address: string; payment: string; payNumber: string;
            items: string; total: number;
          };
          if (!body.orderNo || !body.name || !body.phone) {
            return new Response(JSON.stringify({ error: 'Invalid' }), { status: 400, headers: cors });
          }
          const row = [
            body.orderNo, body.date, body.name, body.phone,
            body.district, body.address, body.payment, body.payNumber || '',
            body.items, body.total,
          ];
          const url = `${GATEWAY_URL}/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:J:append?valueInputOption=USER_ENTERED`;
          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${LOVABLE_API_KEY}`,
              'X-Connection-Api-Key': GOOGLE_SHEETS_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ values: [row] }),
          });
          if (!res.ok) {
            const t = await res.text();
            console.error('Sheets append failed', res.status, t);
            return new Response(JSON.stringify({ error: 'Sheets error', status: res.status }), { status: 502, headers: cors });
          }
          return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors });
        } catch (e) {
          console.error('order error', e);
          return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: cors });
        }
      },
    },
  },
});
