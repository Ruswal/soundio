// Define the Music class that will be the base for all music genres
class Music {
    upload() {
      // Default implementation
    }
  }
  
  // Define the different genres as subclasses of Music
  class RockMusic extends Music {
    upload() {
      console.log('Uploading a rock music...');
      // Specific implementation for rock music
    }
  }
  
  class JazzMusic extends Music {
    upload() {
      console.log('Uploading a jazz music...');
      // Specific implementation for jazz music
    }
  }
  
  // Here's the factory
  class MusicFactory {
    static createMusic(genre) {
      switch (genre) {
        case 'rock':
          return new RockMusic();
        case 'jazz':
          return new JazzMusic();
        default:
          return new Music();
      }
    }
  }
  
  // Usage
  let music = MusicFactory.createMusic('rock');
  music.upload();