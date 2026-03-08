import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function getMaturityLevel(score) {
    if (score <= 35) {
        return {
            title: 'Piloto Automático',
            description: 'A equipe encontra dificuldades com pensamento crítico e execução com Inteligência Emocional. Há um risco de adoção superficial de IA com foco em ferramentas em vez de pessoas.',
            color: '#e74c3c'
        };
    } else if (score <= 60) {
        return {
            title: 'Explorador Empenhado',
            description: 'Sua equipe tem boa vontade técnica, mas a capacidade de execução (P3A) e estruturação de ideias (PATE) ainda falham em alguns pontos, impedindo a verdadeira autonomia.',
            color: '#f39c12'
        };
    } else {
        return {
            title: 'Líder Humano-Digital',
            description: 'Maturidade alta! O ROI da tecnologia é real para vocês. A IA é usada como alavanca e o tempo poupado é investido em conexões humanas, pensamento crítico e gestão emocional.',
            color: '#27ae60'
        };
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    try {
        const { name, email, phone, company, acceptsNewsletter, score, answers } = req.body;

        // Calcula o nível de maturidade baseado nas respostas
        const level = getMaturityLevel(score);
        const fromEmail = "daniel@email.danielmendes.pro.br";

        // 1. Dispara o E-mail para o Lead com o Resultado
        const emailData = await resend.emails.send({
            from: `Daniel Mendes <${fromEmail}>`,
            to: [email],
            bcc: ['daniel@danielmendes.pro.br'], // Daniel recebe cópia
            subject: `Seu Diagnóstico de Liderança e IA: Nível ${level.title}`,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0b1a2a; padding: 30px; text-align: center;">
            <h1 style="color: #ffd700; margin: 0; font-size: 24px;">Diagnóstico de Maturidade em IA e Liderança</h1>
          </div>
          
          <div style="padding: 30px;">
            <p style="font-size: 16px;">Olá <strong>${name}</strong>,</p>
            <p style="font-size: 16px;">Analisamos as respostas sobre a maturidade da sua equipe. Com um escore de <strong>${score} de 75 pontos</strong>, o nível da sua liderança é:</p>
            
            <div style="background-color: #f8f9fa; border-left: 5px solid ${level.color}; padding: 20px; margin: 25px 0; border-radius: 4px;">
              <h2 style="color: ${level.color}; margin-top: 0;">${level.title}</h2>
              <p style="margin-bottom: 0;">${level.description}</p>
            </div>

            <p style="font-size: 16px;">Aprender sobre Inteligência Artificial é aprender sobre Inteligência Humana. Se o seu nível não for "Líder Humano-Digital", vocês provavelmente estão deixando dinheiro e eficiência na mesa.</p>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="https://calendar.app.google/HBSKGgwkTEA2kzZf7" style="background-color: #ffd700; color: #0b1a2a; padding: 14px 28px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">Agendar Diagnóstico Gratuito com Daniel</a>
            </div>
            
            <p style="font-size: 14px; color: #666; text-align: center;">Você também pode responder diretamente a este e-mail para batermos um papo via WhatsApp.</p>
          </div>
          
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #888;">
            <p>Daniel Mendes - Especialista em IA e Psicologia Positiva</p>
            <p><a href="https://www.danielmendes.pro.br" style="color: #888;">danielmendes.pro.br</a></p>
          </div>
        </div>
      `,
        });

        // 2. INTEGRAÇÃO NATIVA SUPABASE
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
                        demanda: 'Diagnóstico de Maturidade (Quiz)',
                        assunto: `Quiz Finalizado: ${score} pts (${level.title})`,
                        mensagem: `Respostas do Quiz:\n${Object.entries(answers).map(([key, value]) => `Pergunta ${key}: Nota ${value}`).join('\n')}`,
                        accepts_newsletter: acceptsNewsletter || false,
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Erro ao inserir no Supabase (Quiz):', errorText);
                }
            } catch (dbError) {
                console.error('Erro de conexão com o Supabase (Quiz):', dbError);
            }
        }

        return res.status(200).json({ success: true, emailId: emailData?.id });
    } catch (error) {
        console.error('Erro geral Submit Quiz:', error);
        return res.status(500).json({ error: error.message });
    }
}
