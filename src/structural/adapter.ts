 
/**
 * Adapter Design Pattern
 *
 * The Adapter pattern allows the interface of an existing class to be used as another
 * interface. It is often used to make existing classes work with others without
 * modifying their source code.
 */

// Target
interface MediaPlayer {
  play(audioType: string, fileName: string): void;
}

// Adaptee
interface AdvancedMediaPlayer {
  playVlc(fileName: string): void;
  playMp4(fileName: string): void;
}

// ConcreteAdaptee
class VlcPlayer implements AdvancedMediaPlayer {
  public playVlc(fileName: string): void {
    console.log(`Playing vlc file. Name: ${fileName}`);
  }

  public playMp4(fileName: string): void {
    // do nothing
  }
}

// ConcreteAdaptee
class Mp4Player implements AdvancedMediaPlayer {
  public playVlc(fileName: string): void {
    // do nothing
  }

  public playMp4(fileName: string): void {
    console.log(`Playing mp4 file. Name: ${fileName}`);
  }
}

// Adapter
class MediaAdapter implements MediaPlayer {
  private advancedMusicPlayer: AdvancedMediaPlayer;

  constructor(audioType: string) {
    if (audioType === "vlc") {
      this.advancedMusicPlayer = new VlcPlayer();
    } else if (audioType === "mp4") {
      this.advancedMusicPlayer = new Mp4Player();
    }
  }

  public play(audioType: string, fileName: string): void {
    if (audioType === "vlc") {
      this.advancedMusicPlayer.playVlc(fileName);
    } else if (audioType === "mp4") {
      this.advancedMusicPlayer.playMp4(fileName);
    }
  }
}

// ConcreteTarget
class AudioPlayer implements MediaPlayer {
  private mediaAdapter: MediaAdapter;

  public play(audioType: string, fileName: string): void {
    if (audioType === "mp3") {
      console.log(`Playing mp3 file. Name: ${fileName}`);
    } else if (audioType === "vlc" || audioType === "mp4") {
      this.mediaAdapter = new MediaAdapter(audioType);
      this.mediaAdapter.play(audioType, fileName);
    } else {
      console.log(`Invalid media. ${audioType} format not supported`);
    }
  }
}

// Example usage
function runAdapterExample() {
  const audioPlayer = new AudioPlayer();

  audioPlayer.play("mp3", "beyond_the_horizon.mp3");
  audioPlayer.play("mp4", "alone.mp4");
  audioPlayer.play("vlc", "far_far_away.vlc");
  audioPlayer.play("avi", "mind_me.avi");
}

runAdapterExample();
