/**
An object to manage a HTML5 Audio element
@class $Audio
@param elm {Audio|String} The audio clip to be managed or the string source of the audio clip
@constructor
*/
var $Audio = function(src) {
	/**
	How many times this audio clip should loop until it should stop
	@property loops
	@private
	*/
	this.loops = 0;
	
	if (typeof src == "string") {
		this.clip = new Audio();
		this.clip.src = src;
	} else
		this.clip = src;
	
	/**
	Determines if this audio clip is currently playing
	@method IsPlaying
	@return Literal True if the audio clip is currently playing
	*/
	this.__defineGetter__("IsPlaying", function() {
		return this.clip.ended;
	});
	
	/**
	Plays this audio clip. If looping it will play it for the remaining loop count
	@method Play
	*/
	this.Play = function() {
		this.clip.play();
	};
	
	/**
	Pauses this audio clip and allows to continue it from this point if played again
	@method Pause
	*/
	this.Pause = function() {
		this.clip.pause();
	};
	
	/**
	This sets the current time of the audio clip to allow "jumping"
	@method SetTime
	@param {Int} The time that the audio clip should start at
	*/
	this.SetTime = function(time) {
		this.clip.currentTime = time;
	};
	
	/**
	Sets the volume for this audio clip
	@method SetVolume
	*/
	this.SetVolume = function(volume) {
		if (volume > 1)
			this.clip.volume = volume * 0.01;
		else
			this.clip.volume = volume;
	};
	
	/**
	The function that is to be used as a callback only for when the audio clip has ended
	@method EndLoopDecrement
	@private
	*/
	this.EndLoopDecrement = function() {
		if (this.loops > 0)
			this.loops--;
		
		if (this.loops > 0)
			this.Play();
	};
	
	this.__defineSetter__("Loops", function(val) {
		this.SetLoopCount(val);
	});
	
	/**
	Sets how many times the audio clip should loop when playing. If 0 is passed then it will loop forever, if -1 is passed then it will turn looping off, otherwise loops the specified amount
	@method SetLoopCount
	@param {Int} The amount of times this audio clip should loop
	*/
	this.SetLoopCount = function(repeats) {
		if (repeats == 0)
			this.clip.loop = true;
		else if (repeats < 0) {
			this.clip.loop = false;
			this.loops = 0;
		}
		else
			this.loops = repeats;
	};
	
	/**
	Fired when the audio clip has finished
	@event ended
	*/
	this.ended = new $Event();
	this.ended.Register(this.EndLoopDecrement, this);
};

/* TODO:  Add overrides for these default audio events if needed
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
