export const MoverMixin = superclass => class extends superclass {
  up (n = 1) {
    if (this.characterY - 1 < 0) {
      this.characterY = 0
    } else {
      this.characterY -= 1;
    }
    this.renderCharacter();
  }

  down (n = 1) {
    if (this.characterY + 1 > this.size) {
      this.characterY = this.size
    } else {
      this.characterY += 1;
    }
    this.renderCharacter();
  }

  right (n = 1) {
    if (this.characterX + 1 > this.size) {
      this.characterX = this.size
    } else {
      this.characterX += 1
    }
    this.renderCharacter();
  }

  left (n = 1) {
    if (this.characterX - 1 < 0) {
      this.characterX = 0
    } else {
      this.characterX -= 1
    }
    this.renderCharacter();
  }
}
