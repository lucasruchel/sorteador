class Sorteio {
    seed = null;
    rounds = 0;
    campain = "";
    endNumber;
    initialNumber;
    generator;
    listOfSorted = [];


    constructor (){
        this.seed = Date.now();
        this.generator = new Math.seedrandom(this.seed);
    }

    getSeed(){
        return this.seed;
    }

    setSeed(seed){
        this.seed = seed;
        this.generator = new Math.seedrandom(this.seed);
    }

    setRange(initialNumber,endNumber){
        this.endNumber = endNumber;
        this.initialNumber = initialNumber;
    }

    sortearNumero(){
        var min = Math.ceil(this.initialNumber);
        var max = Math.floor(this.endNumber);

        var size = this.endNumber - this.initialNumber;
        var n = 0;

        if ((size+1) == this.listOfSorted.length)
            return -1;

        do{
            n = Math.floor(this.generator() * (max - min + 1)) + min;
        } while(this.listOfSorted.includes(n) && (this.listOfSorted.length <= size));
        
        this.listOfSorted.push(n);
        
        return n;
    }


}


$(".change-action").on('input',function(){
    $("#nrosSorteados").empty();

    if (sorteio.listOfSorted.length > 0){
        sorteio = new Sorteio();

        seedComponent = document.getElementById("seed");
        seedComponent.value = sorteio.getSeed();
    }
    
});

$("#generate_seed").change(function(){
    if (this.checked){
        $("#seed").prop("disabled", true);
    }else {
        $("#seed").prop("disabled", false);
    }
})

$("#seed").change(function(){
    sorteio.setSeed(parseInt(this.value));

});

$("#newNumber").click(function(){
   generateRounds(1);
});

$("#newSorteio").click(function(){
    sorteio = new Sorteio();
    seedComponent = document.getElementById("seed");
    seedComponent.value = sorteio.getSeed();
    $("#nrosSorteados").empty();
    $("#initialNumber").val('');    
    $("#endNumber").val('');
    $("#campain").val('');
    document.location.search = '';
});

// $("#share").click(function(){
//     whatsURL = "https://wa.me/?text=";

//     var uri = window.location.href + "?rounds=" + sorteio.length + 
//                                      "&campain=" + $("#campain").val() +
//                                      "&ini=" + $("#initialNumber").val() +
//                                      "&end=" + $("#endNumber").val() +
//                                      "&seed=" + $("#seed").val();

//     var encoded = encodeURI(uri)
//     // $(this).attr("href",whatsURL+encoded);
//     console.log(whatsURL+encoded);
    
// });

function generateRounds(r){
    for (var i = 0; i < r; i++) {
        
        firstNumber = $("#initialNumber").val();
        endNumber = $("#endNumber").val();

        if ((firstNumber >= endNumber) || (firstNumber < 1)){
                alert("Verifique os números de início e fim");
                return;
        }

        sorteio.setRange(firstNumber,endNumber);
        n = sorteio.sortearNumero();

        if (n != -1){
            var p = document.createElement("p");
            var ordem = document.createElement("spam");
            p.classList = "number text-center";
            ordem.classList = "badge badge-light badge-custom";
            ordem.innerText = sorteio.listOfSorted.length+"º ";
            
            p.append(ordem);
            p.append("Número: "+n);

            $("#nrosSorteados").append(p);
        } else {
            alert("Todos os números foram sorteados!!");
        }
        
    }
}


sorteio = new Sorteio();
seedComponent = document.getElementById("seed");
seedComponent.value = sorteio.getSeed();
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.get("seed") != null){
    seed = parseInt(urlParams.get("seed"));
    sorteio.setSeed(seed);
    seedComponent.value = seed
}

if (urlParams.get("ini") != null){
    ini = parseInt(urlParams.get("ini"));
    $("#initialNumber").val(ini);    
}

if (urlParams.get("end") != null){
    end = parseInt(urlParams.get("end"))
    $("#endNumber").val(end);
}

if (urlParams.get("rounds") != null){
    rounds = parseInt(urlParams.get("rounds"));
    generateRounds(rounds);
}

if (urlParams.get("campain") != null){
    campain = urlParams.get("campain");
    $("#campain").val(campain);
}

