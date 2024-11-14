import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_APIKEY)

export const sendEmail = async (
    email: string,
    subject: string,
    text: string
) => {
    await resend
        .emails.send({
            from: '',
            to: email,
            subject,
            html: '',
        })        
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}