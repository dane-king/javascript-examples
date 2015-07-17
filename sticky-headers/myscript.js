var waypoints = $('.followMeBar').waypoint({
  handler: function(direction) {
  	$('.followMeBar').removeClass('stuck');
    notify(this.element)
  }
});
function notify(el){
  	$(el).addClass('stuck');
};