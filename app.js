// 4cc4e8cd803054625c7ffdb841d01106 key api weather
function verifierFormatDate(date){
    if (date <= 9) {
            return "0" + date;
    }
    else{
        return "" + date;
    }
}
function obtenirMeteo(ville){
    
    $.ajax({
        url : "http://api.openweathermap.org/data/2.5/forecast?q=" + ville + ",fr&units=metric&APPID=4cc4e8cd803054625c7ffdb841d01106",
        success: function(data){
            if (data.city.name != ville) {
                $("#test").html("<h1>Ville non trouvée</h1>");
            }else{
                $("#test").html("<h1>Météo pour " + data.city.name + "</h1>");
                console.log(data);
                var listLength = data.list.length
                var enteteTableau = "<table class='table table-striped table-bordered'><thead><tr><th>Date/heure</th><th>Temperature</th><th>Temps</th></tr></thead><tbody>";
                var finTableau = "</tbody></table>";
                var tabAjd = "<h1>Ajourd'hui</h1>" + enteteTableau;
                var tabDemain = "<h1>Demain</h1>" + enteteTableau;
                var tab2jour = "<h1>Après-demain</h1>" + enteteTableau;
                var tab3jour = "<h1>Dans 3 jours</h1>" + enteteTableau;
                var tab4jour = "<h1>dans 4 jours</h1>" + enteteTableau;
                var tab5jour = "<h1>dans 5 jours</h1>" + enteteTableau;
                var ajd = new Date();
                var demain = ajd.getDate() + 1;
                var jour2 = ajd.getDate() + 2;
                var jour3 = ajd.getDate() + 3;
                var jour4 = ajd.getDate() + 4;
                var jour5 = ajd.getDate() + 5;
                ajd = ajd.getDate();
                ajd = verifierFormatDate(ajd);
                demain = verifierFormatDate(demain);
                jour2 = verifierFormatDate(jour2);
                jour3 = verifierFormatDate(jour3);
                jour4 = verifierFormatDate(jour4);
                jour5 = verifierFormatDate(jour5);
                var dateMeteo;
                for (var i = 0; i < listLength; i++) {
                    var contenu =  "<tr><td>" + data.list[i].dt_txt + "</td>" + "<td>" + data.list[i].main.temp + "°C</td>" +
                    "<td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'></td></tr>";
                    dateMeteo = "" + data.list[i].dt_txt.charAt(8) + data.list[i].dt_txt.charAt(9);
                    if (ajd === dateMeteo) {
                        tabAjd += contenu; 
                    }else if (demain === dateMeteo) {
                        tabDemain += contenu; 
                    }else if (jour2 === dateMeteo) {
                        tab2jour += contenu; 
                    }else if (jour3 === dateMeteo) {
                        tab3jour += contenu; 
                    }else if (jour4 === dateMeteo) {
                        tab4jour += contenu; 
                    }else if (jour5 === dateMeteo) {
                        tab5jour += contenu; 
                    }
                }
                tabAjd += finTableau;
                tabDemain += finTableau;
                tab2jour += finTableau;
                tab3jour += finTableau;
                tab4jour += finTableau;
                tab5jour += finTableau;
                $("#test").append(tabAjd + tabDemain + tab2jour + tab3jour + tab4jour + tab5jour)
            }
        },
        error: function(){
            alert("Echec de la connexion !");
        }
    })
}
$("#valider").click(function(){
    var ville = $("#ville").val();
    obtenirMeteo(ville)
})