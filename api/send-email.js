import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Garante que só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { name, email, subject, company, message } = req.body;

    // Se você não validou seu domínio no Resend, o "from" TEM QUE SER o abaixo:
    const fromEmail = "daniel@danielmendes.pro.br"; 
    
    const data = await resend.emails.send({
      from: `Site Contato <${fromEmail}>`,
      to: ['daniel@danielmendes.pro.br'], // E-mail que vai receber
      subject: `SITE: ${subject || 'Novo Contato'}`,
      html: `
        <h3>Novo contato via site danielmendes.pro.br</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company || 'Não informada'}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
