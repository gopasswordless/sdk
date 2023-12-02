export type Theme = "light" | "dark" | "custom";

export const modalStyle = {
  visibility: "hidden",
  opacity: "0",
  position: "fixed",
  zIndex: "1000",
  left: "0",
  top: "0",
  width: "100%",
  overflow: "auto",
  transition: "opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease", // Transition effects
  transform: "translateY(-10%)", // Start slightly above the final position
};

export const openModalStyle = {};

export const closedModalStyle = {};

export interface ModalContentStyleProps {
  theme: Theme;
}

export const modalContentStyle = ({ theme }: ModalContentStyleProps) => ({
  backgroundColor: theme === "dark" ? "rgb(0 0 0 / 50%)" : "rgb(255 255 255)",
  margin: "10% auto",
  border: "1px solid #ffffff30",
  width: "300px",
  height: "300px",
  padding: "50px 25px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  animationName: "animatetop",
  animationDuration: "0.4s",
  borderRadius: "5px",
  color: theme === "dark" ? "#ffffff90" : "rgb(0 0 0 / 75%);",
  textAlign: "center",
});

export interface ModalInputStyleProps {
  theme: Theme;
}

export const modalInputStyle = ({ theme }: ModalInputStyleProps) => ({
  padding: "10px",
  margin: "10px 0",
  width: "calc(100%)", // Full width minus padding
  boxSizing: "border-box", // Include padding in width calculation
  borderRadius: "4px",
  border: "1px solid #555", // Subtle border
  backgroundColor: "rgba(255, 255, 255, 0.1)", // Slightly transparent background
  color: "rgb(220, 220, 220)", // Text color
  fontSize: "16px", // Readable font size
});

export interface ModalButtonStyleProps {
  theme: Theme;
}

export const modalButtonStyle = ({ theme }: ModalButtonStyleProps) => ({
  padding: "12px",
  width: "100%",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#0070f4", // A purple-like color
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  margin: "10px 0",
  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)", // Subtle shadow
});

export interface ModalLinkStyleProps {
  theme: Theme;
}

export const modalLinkStyle = ({ theme }: ModalLinkStyleProps) => ({
  color: theme === "dark" ? "#ffffff90" : "rgb(0 0 0 / 75%);",
  textDecoration: "none",
  cursor: "pointer",
});
