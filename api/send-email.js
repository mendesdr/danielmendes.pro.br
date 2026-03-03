import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Site Daniel Mendes <onboarding@resend.dev>', // Ou seu domínio verificado no Resend
      to: ['seu-email@exemplo.com'], // O e-mail que vai receber as notificações
      subject: `Novo contato: ${name}`,
      html: `<p><strong>Nome:</strong> ${name}</p>
             <p><strong>E-mail:</strong> ${email}</p>
             <p><strong>Mensagem:</strong> ${message}</p>`,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
