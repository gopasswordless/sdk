export interface GoPasswordlessModalOps {
  width: string;
  height: string;
}

export class GoPasswordlessModal {
  private options: GoPasswordlessModalOps | null = null;
  private modal: HTMLElement | null = null;

  constructor(
    options: GoPasswordlessModalOps = { width: "50%", height: "50%" }
  ) {
    this.options = options;
    this.initModal();
  }

  initModal() {
    // Create modal HTML elements
    this.modal = document.createElement("div");
    this.modal.className = "gopasswordless";

    this.modal.style.width = this.options?.width || "50%";
    this.modal.style.height = this.options?.height || "50%";

    // Append modal to the document body or a specified parent element
    document.body.appendChild(this.modal);

    // Add event listeners for modal interactions
    this.addEventListeners();
  }

  addEventListeners() {
    // Add event listeners for close button, background click, etc.
  }

  open() {
    // Logic to open modal
    this.modal ? (this.modal.style.display = "block") : null;
  }

  close() {
    // Logic to close modal
    this.modal ? (this.modal.style.display = "none") : null;
  }
}
