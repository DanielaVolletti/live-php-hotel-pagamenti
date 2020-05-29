// funzioni
function getAllPagamenti() {
  $.ajax({
    url:"getAllPagamenti.php",
    method: "GET",
    success: function (data) {
      printAllPagamenti(data);
    }
  })
};

function printAllPagamenti(data) {
  var source = $("#pagamento-template").html();
  var template = Handlebars.compile(source);
  for (var pagamento of data) {
    var html = template(pagamento);
    $('.pagamenti').append(html);
  }
}

function deletePagamenti() {
  var cestino = $(this);
  var pagamentoSelezionato = cestino.parent();
  var dataId = pagamentoSelezionato.data("id");
  $.ajax({
    url: "deletePagamenti.php",
    method: "POST",
    data: {
      id : dataId
    },
    success: function () {
      pagamentoSelezionato.remove();
    },
    error: function (err) {
      console.error(err);
    }
  })
}

$(document).ready(function () {

  getAllPagamenti();

  $(document).on("click", "i.delete", deletePagamenti);

})
