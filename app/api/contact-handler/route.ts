import { NextResponse } from "next/server"
import nodeMailer from "nodemailer"
import dedent from "dedent";


export async function POST(request: Request) {
    const reqBody = await request.json()
    const { email, name, phone, company, service, message } = reqBody

    try{
        const transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,               // メールサーバー。ここではHotmail/Outlookを使った例
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER, // SMTPユーザー名
                pass: process.env.SMTP_PASSWORD // SMTPパスワード
            }
        })
    
        const mailOptions = {
            from: process.env.SMTP_USER, // 送信元アドレス
            to: email,
            subject: "お問い合わせを受け付けました。",
            text: dedent`お問い合わせありがとうございます。内容を確認の上、追ってご連絡いたします。\n\n
                【お問合せ内容】
                名前: ${name} \n\n
                メールアドレス: ${email}\n\n
                会社名: ${company}\n\n
                電話番号: ${phone}\n\n
                サービス: ${service}\n\n
                メッセージ: ${message}

                --------------------
                株式会社A-Key
                〒106-0032 東京都港区六本木7-11-17-302
                Email: ${process.env.SMTP_USER}
                tel: 080-8473-0282
                URL: https://company.a-key33.com
            `
        }


        const mailOptionsToAdmin = {
            from: process.env.SMTP_USER, // 送信元アドレス
            to: process.env.SMTP_USER,
            subject: "お問い合わせがありました。",
            text: dedent`【お問合せ内容】
                名前: ${name} \n\n
                メールアドレス: ${email}\n\n
                会社名: ${company}\n\n
                電話番号: ${phone}\n\n
                サービス: ${service}\n\n
                メッセージ: ${message}
            `.trim()
        }
    
        const info = await transporter.sendMail(mailOptions)
        const infoAdmin = await transporter.sendMail(mailOptionsToAdmin)
        return NextResponse.json({message: "成功しました"})
    }catch(err){
        return NextResponse.json({message: "失敗しました"})
    }
}