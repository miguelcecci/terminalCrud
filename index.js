var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
var nameSchema = mongoose.Schema({
  name: String
});
var Name = mongoose.model('Name', nameSchema);

var scanf = require('scanf');

function gravarNome(nome, callback) {

  var novo = new Name({'name':nome});
  var promise = novo.save(function (err, novo) {
    callback();
  });
}

function listar(callback) {
  Name.find(function (err, nomes) {
    console.log("------------Listando Nomes------------\n");
    for (var i = 0; i < nomes.length; i++) {
      console.log('>>>>',nomes[i].name);
    }
    console.log('\n');
    callback();
  });
}

function sair() {
  mongoose.connection.close(function(){
    console.log('Conexao com banco encerrada');
  });
}

function apagar(nome, callback) {
  Name.remove({'name':nome}, function() {
    callback();
  });

}
//acesso por menu
var menu = function(){
  console.log('____________________________________________________');
  console.log('1 - Gravar um nome \n2 - listar nomes \n3 - deletar \n4 - sair');
  var opc = scanf('%d');
  switch (opc) {
    case 1:
    console.log('input your name');
    var nome = scanf('%s');
    gravarNome(nome, menu);
    break;
    case 2:
    listar(menu);
    break;
    case 3:
    console.log('digite o nome que deseja remover');
    var nome = scanf('%s');
    apagar(nome, menu);
    break;
    default:
    sair();
  }
}
//manipulaçao por comando e argumento
var myArgs = process.argv.slice(2);
switch (myArgs[0]) {
  case '-r':
  gravarNome(myArgs[1], sair);
  break;
  case '-d':
  apagar(myArgs[1], sair);
  break;
  case '-s':
  listar(sair);
  break;
  case '-m':
  menu();
  break;
  default:
  console.log('-r para gravar, -d para apagar, -s para sair');
  sair();
  break;
}
