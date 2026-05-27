const API_KEY = 'SUA_CHAVE_GROQ_AQUI'; // Substitua pela sua chave de API da Groq

const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const copyBtn = document.getElementById('copyBtn');
const output = document.getElementById('recipeOutput');
const ingredientsInput = document.getElementById('ingredients');

generateBtn.addEventListener('click', async () => {
    const ingredients = ingredientsInput.value.trim();
    if (!ingredients) return alert("Por favor, insira os ingredientes!");

    output.innerText = "Chef IA cozinhando...";

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // Modelo atualizado
                messages: [{
                    role: "user",
                    content: `Crie uma receita curta, prática e deliciosa usando apenas estes ingredientes: ${ingredients}. Formate de forma organizada.`
                }]
            })
        });

        const data = await response.json();

        if (data.error) throw new Error(data.error.message);

        output.innerText = data.choices[0].message.content;
    } catch (err) {
        output.innerText = "Erro: " + err.message;
        console.error(err);
    }
});

clearBtn.addEventListener('click', () => {
    ingredientsInput.value = '';
    output.innerText = "Última Receita Gerada:";
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(output.innerText);
    alert("Receita copiada!");
});