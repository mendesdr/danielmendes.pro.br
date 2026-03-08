import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { name, email, phone, company, demand, subject, message, acceptsNewsletter } = req.body;

    const fromEmail = "daniel@email.danielmendes.pro.br";

    // Resend: Envia para o Lead e envia cópia oculta (BCC) para o Daniel
    const data = await resend.emails.send({
      from: `Daniel Mendes <${fromEmail}>`,
      to: [email],
      bcc: ['daniel@danielmendes.pro.br'],
      subject: `Recebemos sua solicitação: ${subject || 'Diagnóstico de IA e Liderança'}`,
      html: `
        <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
          <h3 style="color: #0b1a2a;">Olá ${name}, recebemos sua solicitação com sucesso!</h3>
          <p>Obrigado pelo seu interesse. Irei analisar sua demanda sobre <strong>${demand}</strong> para a empresa <strong>${company || 'Não informada'}</strong> e entrarei em contato em breve para agendarmos o nosso papo.</p>
          <br/>
          <h4 style="color: #0b1a2a; border-bottom: 1px solid #eee; padding-bottom: 5px;">Resumo dos seus dados:</h4>
          <p><strong>Celular:</strong> ${phone || 'Não informado'}</p>
          <p><strong>Assunto:</strong> ${subject}</p>
          <p><strong>Sua Mensagem:</strong><br/><i>${message}</i></p>
          <br/>
          <p>Um abraço,</p>
          <p>
            <strong>Daniel Mendes</strong><br/>
            Especialista em IA & Liderança Corporativa<br/>
            <a href="https://www.danielmendes.pro.br" style="color: #ffd700;">danielmendes.pro.br</a>
          </p>
        </div>
      `,
    });

    // INTEGRAÇÃO NATIVA SUPABASE (Substitui o Make.com)
    // Usando as variáveis injetadas automaticamente pela integração Vercel <-> Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            nome: name,
            email: email,
            celular: phone || '',
            empresa: company || '',
            demanda: demand || '',
            assunto: subject || '',
            mensagem: message || '',
            accepts_newsletter: acceptsNewsletter || false,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro ao inserir no Supabase:', errorText);
        }
      } catch (dbError) {
        console.error('Erro de conexão com o Supabase:', dbError);
      }
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
