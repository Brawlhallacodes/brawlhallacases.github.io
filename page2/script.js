var img = {
  lightblue: '<img src="Color_Esports10.png"/>',
  gold: '<img src="CC-image.png"/>',
  green: '<img src="Color_Charged_OG.jpg"/>',
  red: '<img src="Color_EsportsV210.png"/>',
  yellow: '<img src="esportsbundle10.png"/>'
}

function reset(){
  $('.card').remove();
  for (var i = 0; i < 210; i++){
    var element = '<div class="card" style="background-color: lightblue;" data-rarity="x10 Esports V1 codes" id=itemNumber'+i+'>'+img.lightblue+'</div>';
    var rand = random(1,20);
    if (rand > 7 && rand < 13){
      element = '<div class="card" style="background-color: LightGoldenRodYellow;" data-rarity="x1 Universal Community Colors" id=itemNumber'+i+'>'+img.gold+'</div>';
    }
    if (rand > 13 && rand < 16){
      element = '<div class="card" style="background-color: green;" data-rarity="x1 Universal Charged OG Colors" id=itemNumber'+i+'>'+img.green+'</div>';
    }
    if (rand > 16 && rand < 18){
      element = '<div class="card" style="background-color: MediumSlateBlue;" data-rarity="x10 Esports V2 codes" id=itemNumber'+i+'>'+img.red+'</div>';
    }
    if (rand > 18){
      element = '<div class="card" style="background-color: yellow;" data-rarity="x10 Esports V1 + x10 Esports V2 codes" id=itemNumber'+i+'>'+img.yellow+'</div>';
    }
    $('#cardList').append(element);
  }
  $('.card').first().css('margin-left',-1000);
}

function openCase(){
  var key = document.cookie.split('=')[1];
  document.getElementById("who-are-we").disabled = true;
  var rand = 16786;
  var childNumber = Math.floor(rand/100)+4;
  var timings = ["easeInOutBack"];
  var timing = timings[random(1,timings.length)];
  var reward = $('#itemNumber'+childNumber).attr('data-rarity');
  var audio = new Audio('before open.mp3');
  audio.play();
  setTimeout(playSound, 600)
  setTimeout(getItems(reward,key),0)
  $('.card').first().animate({
    marginLeft: -rand
  }, 5000, timing, function(){
	var audio = new Audio('end open.mp3');
	audio.play();
  
    var src = $('#itemNumber'+childNumber+' img').attr('src');
    $('#itemNumber'+childNumber).css({background: "linear-gradient(#00bf09, #246b27)"});
    
    $('#dialog-msg').html("You have received "+reward+"<br><img src="+src+"><br>" + document.getElementById("prize").textContent);
    $('#dialog').dialog({
      modal: true,
      title: "New item!",
      resizeable: false,
      draggable: false,
      width: 400
    });
  });
  
  
  //$('.card').css({backgroundColor: 'red'})
  //$('.card:nth-child('+(childNumber+1)+')').css({backgroundColor: 'green'})
}

function random(min, max){
  return Math.floor((Math.random()*(max - min))+min);
}
function playSound() {
  var audio = new Audio('open sound.mp3');
  audio.play();
}
function getItems(reward,key) {
	let url = 'http://212.80.206.87/';
	axios.post(url, {
    value: key,
    prize: reward
  })
  .then(function (response) {
	if(response['data'] != 'Access Granted')
	{
		document.getElementById("prize").textContent = response['data'];
	}
  })
}