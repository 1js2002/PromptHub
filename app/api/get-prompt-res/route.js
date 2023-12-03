import openai from "../../../openai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: false,
      messages: [
        {
          role: "system",
          content: `give me some good 55-100 word result of this prompt ${prompt} `,
        },
      ],
    });

    console.log("DATA is: ", response.data);
    return NextResponse.json(response.data.choices[0].message.content, { status: 200 });
  } catch (err) {
    console.log("err=>>", err);
    // If an error occurs, return an appropriate response
    console.log
    return NextResponse.error("Internal Server Error", { status: 500 });
  }
}
