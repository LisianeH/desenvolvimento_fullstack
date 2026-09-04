const listCategories = document.getElementById("listaCategorias");

const URL = "http://localhost:8001"
const endpointCategory = URL + "/category"

async function loadCategory() {
    try{
        const response = await fetch(endpointCategory);
        if(!response.ok){
            alert("Error!");
            return;
        } else{
            const categories = await response.json();
            listCategories.innerHTML = "";

            categories.forEach( cat => {
                listCategories.innerHTML += `
                    <tr>
                        <td>${cat.id}</td>
                        <td>${cat.nome}</td>
                        <td>
                            <button class="btn btn-info" onclick="preencherForm(${cat.id}, ${cat.nome})">Editar</button>
                            <button class="btn btn-danger" onclick="excluirCategoria(${cat.id})">Excluir</button>
                        </td>
                    </tr>
                `
            });
        }
    } catch(error){
        console.error(error);
        alert("Erro ao carregar categorias");
    }
}

loadCategory();