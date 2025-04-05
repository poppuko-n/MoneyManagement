import axios from 'axios';

class OpenAiApi {

  completion(messages, apiKey) {
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: messages,
    };

    return axios.post(
      'https://api.openai.com/v1/chat/completions',
      requestData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    ).then(response => {
      return response.data.choices[0].message.content;
    });
  }
}

export default new OpenAiApi();
