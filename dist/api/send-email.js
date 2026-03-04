import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { name, email, subject, company, message } = req.body;

    // USAR O E-MAIL DE TESTE DO RESEND ENQUANTO NÃO VALIDA O DOMÍNIO
    const fromEmail = "daniel@email.danielmendes.pro.br"; 
    
    const data = await resend.emails.send({
      from: `Site Contato <${fromEmail}>`,
      // IMPORTANTE: O "to" deve ser o e-mail que você usou para criar a conta no Resend!
      // Se sua conta foi criada com mendes.dr@gmail.com, coloque ele aqui:
      to: ['daniel@danielmendes.pro.br'], 
      subject: `SITE: ${subject || 'Novo Contato'}`,
      html: `
        <h3>Novo contato via site danielmendes.pro.br</h3>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email do Lead:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company || 'Não informada'}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <hr />
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
