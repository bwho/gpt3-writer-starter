import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration ({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`
Write a step-by-step recipe that is plant-based and includes at least one of the following ingredients. The ideal output will include all ingredients. Provide a name for the recipe in a section titled "Recipe Title:". In a bulleted list, provide the list of ingredients and their amounts in a section titled "Ingredients:". In a sub section of "Ingredients:" titled "Additional Ingredients:", identify all of the additional ingredients that are needed to complete the recipe that were not included in the initially submitted ingredients. The additional ingredients needed should be inexpensive and usually found at home already. If applicable, include a section called "Time:" that notes both the "Prep Time:" and "Cook Time". Include step-by-step instructions on how to complete the recipe in a section titled "Instructions:".

Ingredients:
`;

const generateAction = async (req, res) => {
  // Run first prompt
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userCombinedInput}\n\n`,
    temperature: 0.5,
    max_tokens: 256,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;