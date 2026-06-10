const ref = db.ref("fornecedores");

let idcapturado = null;
$("#cancelar").hide();



$("#salvar").click(function () {
    let nome = $("#nome").val();
    let salario = $("#salario").val();
    let email = $("#email").val();
    let cargo = $("input[name='cargo']:checked").val();

    if (nome === "" || salario === "" || email === "" || !cargo) {
        alert('Preencha todos os campos');
        return;
    }

    
    if (idcapturado) {//editar
        ref.child(idcapturado).update({ nome, email, salario, cargo });
        resetar();

    } else {//salvar
       ref.push({ nome, email, salario, cargo });
    }

    

    limpar();
});


//--------------------------------------------------------


ref.on("value", dados_tabela => {
    $('#lista').empty();

    $("#lista").append(`
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                 <th>Salário</th>
                  <th>Cargo</th>
                <th colspan="2">Opções</th>
            </tr>
            `);
    
    dados_tabela.forEach(registro => {
        let reg = registro.val();
        let id = registro.key;
        
        $("#lista").append(`
            <tr>
                <td>${id}</td>
                <td>${reg.nome}</td>
                <td>${reg.email}</td>
                <td>${reg.salario}</td>
                <td>${reg.cargo}</td>
                <td>
                     <button class="btn btn-outline-danger btn-sm" onclick="excluir('${id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
                <td>
                     <button class="btn btn-outline-warning btn-sm" onclick="editar('${id}','${reg.nome}','${reg.email}','${reg.salario}', '${reg.cargo}',)">
                        <i class="bi bi-pencil"></i>
                    </button>
                </td>
            </tr>
            `);
    });
});





//--------------------------------------------------------


function limpar() {
    $("#nome").val("");
    $("#email").val("");
    $("#salario").val("");
    $("input[name='cargo']").prop("checked", false);
    $("#salario").val();
    $("#nome").focus();
    
};


function editar(id, nome, email, salario, estado) {
    $("#nome").val(nome);
    $("#email").val(email);
    $("#salario").val(salario);
    $("input[name='cargo'][value='" + cargo + "']").prop("checked", true);

    idcapturado = id;

    $("#cancelar").show();

    $("#salvar")
        .text("Atualizar")
        .removeClass("btn-primary")
        .addClass("btn-success");

    $("#status"). text("Editando registro...");
}


//--------------------------------------------------------


function resetar() {
    idcapturado = null;
    limpar();
    $("#status").text("");
    $("#salvar")
        .text("Salvar")
        .removeClass("btn-success")
        .addClass("btn-primary");
    $("#cancelar").hide();
}

$("#cancelar").click(function () {
    resetar();
});

function excluir(id) {
    if (confirm("Tem certeza que deseja excluir?")) {
        db.ref("fornecedores/" + id).remove();
    }
}