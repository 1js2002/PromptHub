import openai from "../../../openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { prompt } = await request.json();
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: false,
      messages: [
        {
          role: "system",
          content: `give me some good 100-150 word result of this prompt ${prompt} `,
        },
      ],
    });

    console.log("DATA is: ", response.data);
    return NextResponse.json(response.data.choices[0].message.content, { status: 200 });
  } catch (err) {
    console.log("err=>>",err);
  }
}
