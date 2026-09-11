const listCategories = document.getElementById("listaCategorias");

const URL = "http://localhost:8001"
const endpointCategory = URL + "/category"
const endpointProduct = URL + "/product"

const form = document.getElementById("formCategory");
const fieldId = document.getElementById("idCat");
const fielName = document.getElementById("txtName");

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
                            <button class="btn btn-info" onclick="fillForm('${cat.id}', '${cat.nome}')">Editar</button>
                            <button class="btn btn-danger" onclick="deleteCategory(${cat.id})">Excluir</button>
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

async function deleteCategory(id){
    const confirmation = confirm("Confirma exclusão?");
    
    if(!confirmation) return;

    try{
        const response = await fetch(
            `${endpointCategory}/${id}`,
            {method: 'DELETE'}
        )

        if(response.ok){
            alert("Categoria excluida com sucesso!")
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao excluir categoria");
    }
}

function fillForm(idCat, nameCat){
    fieldId.value = idCat;
    fielName.value = nameCat;
}

async function editCategory(idCat, category){
    try{
        const response = await fetch(
            `${endpointCategory}/${idCat}`,
            {
                method: "PUT", 
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(category)
            }
        );
        if(response.ok){
            alert("Categoria atualizada com sucesso!");
            loadCategory();
        }
    } catch(error){
        console.error(error);
        alert("Erro ao editar categoria");
    }
}

async function addCategory(category) {
    const response = await fetch(
        endpointCategory,
        {
            method: "POST", 
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(category)
        }
    );
    if(response.ok){
        alert("Categoria adicionada com sucesso!");
        loadCategory();
    }
    return await response.json();
}

form.addEventListener("submit", async function(event){
    event.preventDefault();
    const idCat = fieldId.value;
    const category = {nome : fielName.value}

    try{
        if(idCat){
            await editCategory(idCat, category);
        } else{
            await addCategory(category);
        }
    } catch(error){
        console.error(error);
        alert("Erro ao adicionar ou editar categoria")
    }
});