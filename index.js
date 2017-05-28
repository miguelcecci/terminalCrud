var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connction;
// db.on('error', console.error.bind(console, 'connection error:'));
var nameSchema = mongoose.Schema({
  name: String
});
var Name = mongoose.model('Name', nameSchema);

var scanf = require('scanf');

function gravarNome(menu) {
  console.log('input your name');
  var nome = scanf('%s');

  var novo = new Name({'name':nome});
  var promise = novo.save(function (err, novo) {
    menu();
  });
}

function listar(menu) {
  Name.find(function (err, nomes) {
    console.log("------------Listando Nomes------------\n");
    for (var i = 0; i < nomes.length; i++) {
      console.log('>>>>',nomes[i].name);
    }
    menu();
  });
}

function sair(menu) {
  mongoose.connection.close(function(){
    console.log('Conexao com banco encerrada')
  });
}

function apagar(menu) {
  console.log('digite o nome que deseja remover');
  var nome = scanf('%s');
  Name.remove({'name':nome}, function() {
    menu();
  });

}

var menu = function(){
  console.log('____________________________________________________');
  console.log('1 - Gravar um nome \n2 - listar nomes \n3 - deletar \n4 - sair');
  var opc = scanf('%d');
  switch (opc) {
    case 1:
    gravarNome(menu);
    break;
    case 2:
    listar(menu);
    break;
    case 3:
    apagar(menu);
    break;
    default:
    sair(menu);
  }
}

menu();
