const listCategories = document.getElementById("listaCategorias");

const URL = "http://localhost:8001"
const endpointCategory = URL + "/category"
const endpointProduct = URL + "/product"

const form = document.getElementById("formCategory");
const fieldId = document.getElementById("idCat");
const fielName = document.getElementById("txtName");

const listProducts = document.getElementById("listaProdutos");
const formProduct = document.getElementById("formProduct");
const fieldIdProd = document.getElementById("idProd");
const fieldNameProd = document.getElementById("txtNameProd");
const fieldPrice = document.getElementById("txtPrice");
const selectCategory = document.getElementById("selCategory");

let products = [];

function fillCategorySelect(categories){
    const selected = selectCategory.value;
    selectCategory.innerHTML = `<option value="">Sem categoria</option>`;

    categories.forEach( cat => {
        selectCategory.innerHTML += `<option value="${cat.id}">${cat.nome}</option>`
    });

    selectCategory.value = selected;
}

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

            fillCategorySelect(categories);
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
            loadCategory();
        } else {
            alert("Não foi possível excluir. Verifique se existem produtos nesta categoria.");
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
            loadProduct();
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

// ---------- PRODUTO ----------

function formatPrice(price){
    if(price === null || price === undefined) return "-";
    return Number(price).toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
}

async function loadProduct() {
    try{
        const response = await fetch(endpointProduct);
        if(!response.ok){
            alert("Error!");
            return;
        }

        products = await response.json();
        listProducts.innerHTML = "";

        products.forEach( prod => {
            listProducts.innerHTML += `
                <tr>
                    <td>${prod.id}</td>
                    <td>${prod.nome}</td>
                    <td>${formatPrice(prod.preco)}</td>
                    <td>${prod.cat ?? "-"}</td>
                    <td>
                        <button class="btn btn-info" onclick="fillFormProduct(${prod.id})">Editar</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${prod.id})">Excluir</button>
                    </td>
                </tr>
            `
        });
    } catch(error){
        console.error(error);
        alert("Erro ao carregar produtos");
    }
}

loadProduct();

async function deleteProduct(id){
    const confirmation = confirm("Confirma exclusão?");

    if(!confirmation) return;

    try{
        const response = await fetch(
            `${endpointProduct}/${id}`,
            {method: 'DELETE'}
        )

        if(response.ok){
            alert("Produto excluido com sucesso!")
            loadProduct();
        } else {
            alert("Não foi possível excluir o produto");
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao excluir produto");
    }
}

function fillFormProduct(idProd){
    const prod = products.find( p => p.id === idProd );

    fieldIdProd.value = prod.id;
    fieldNameProd.value = prod.nome;
    fieldPrice.value = prod.preco ?? "";
    selectCategory.value = prod.codCategoria ?? "";
}

function clearFormProduct(){
    formProduct.reset();
    fieldIdProd.value = "";
}

async function editProduct(idProd, product){
    try{
        const response = await fetch(
            `${endpointProduct}/${idProd}`,
            {
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(product)
            }
        );
        if(response.ok){
            alert("Produto atualizado com sucesso!");
            clearFormProduct();
            loadProduct();
        } else {
            alert("Não foi possível editar o produto");
        }
    } catch(error){
        console.error(error);
        alert("Erro ao editar produto");
    }
}

async function addProduct(product) {
    try{
        const response = await fetch(
            endpointProduct,
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(product)
            }
        );
        if(response.ok){
            alert("Produto adicionado com sucesso!");
            clearFormProduct();
            loadProduct();
        } else {
            alert("Não foi possível adicionar o produto");
        }
    } catch(error){
        console.error(error);
        alert("Erro ao adicionar produto");
    }
}

formProduct.addEventListener("submit", async function(event){
    event.preventDefault();
    const idProd = fieldIdProd.value;
    const product = {
        nome : fieldNameProd.value,
        preco : fieldPrice.value === "" ? null : Number(fieldPrice.value),
        codCategoria : selectCategory.value === "" ? null : Number(selectCategory.value)
    }

    if(idProd){
        await editProduct(idProd, product);
    } else{
        await addProduct(product);
    }
});