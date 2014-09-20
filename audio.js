var $Audio = function(src) {
	this.loops = 0;
	
	if (typeof src == "string") {
		this.clip = new Audio();
		this.clip.src = src;
	} else
		this.clip = src;
	
	this.IsPlaying = function() {
		return this.clip.ended;
	};
	
	this.Play = function() {
		this.clip.play();
	};
	
	this.Pause = function() {
		this.clip.pause();
	};
	
	this.SetTime = function(time) {
		this.clip.currentTime = time;
	};
	
	this.SetVolume = function(volume) {
		if (volume > 1)
			this.clip.volume = volume * 0.01;
		else
			this.clip.volume = volume;
	};
	
	this.EndLoopDecrement = function() {
		if (this.loops > 0)
			this.loops--;
		
		if (this.loops > 0)
			this.Play();
	};
	
	this.SetLoopCount = function(repeats) {
		if (repeats == 0)
			this.clip.loop = true;
		else if (repeats < 0)
			this.clip.loop = false;
		else
			this.loops = repeats;
	};
	
	this.ended = new $Event();
	this.ended.Register(this.EndLoopDecrement, this);
};

/*
abort
canplay
canplaythroughdurationchange
emptied
ended
error
loadeddata
loadedmetadata
loadstart
pause
play
playing
progress
ratechange
seeked
seeking
stalled
suspend
timeupdate
volumechange
waiting
*/
