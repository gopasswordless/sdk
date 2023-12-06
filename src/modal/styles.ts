export type Theme = "light" | "dark" | "custom";

export const modalStyle = {
  visibility: "hidden",
  opacity: "0",
  position: "absolute",
  zIndex: "1000",
  left: "0",
  top: "0",
  width: "100%",
  height: "100vh",
  overflow: "auto",
  backgroundColor: "rgba(0,0,0,0.4)",
  backdropFilter: "blur(5px)",
};

export const openModalStyle = {
  visibility: "visible",
  opacity: "1",
};

export const closedModalStyle = {
  visibility: "hidden",
  opacity: "0",
};

export interface ModalContentStyleProps {
  theme: Theme;
}

export const modalContentStyle = ({ theme }: ModalContentStyleProps) => ({
  backgroundColor: theme === "dark" ? "rgb(0 0 0)" : "rgb(255 255 255)",
  margin: "10% auto",
  border: "1px solid #ffffff30",
  width: "300px",
  height: "300px",
  padding: "50px 25px",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  animationName: "animatetop",
  animationDuration: "0.4s",
  borderRadius: "5px",
  color: theme === "dark" ? "#ffffff90" : "rgb(0 0 0 / 90%);",
  textAlign: "center",
  visibility: "hidden",
  opacity: "0",
  transform: "scale(0.9)", // Start with the modal slightly scaled down
  animation: "modalFadeInScaleUp 0.5s ease-out forwards", // Animation
});

export const openModalContentStyle = {
  visibility: "visible",
  opacity: "1",
};

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
  color: theme === "dark" ? "rgb(220, 220, 220)" : "#000000", // Text color
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
  opacity: "1",
  pointerEvents: "auto",
});

export interface ModalButtonStyleLoadingProps {
  theme: Theme;
}

export const modalButtonStyleLoading = ({
  theme,
}: ModalButtonStyleLoadingProps) => ({
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
  opacity: "0.5",
  pointerEvents: "none",
});

export interface ModalLinkStyleProps {
  theme: Theme;
}

export const modalLinkStyle = ({ theme }: ModalLinkStyleProps) => ({
  color: theme === "dark" ? "#ffffff90" : "rgb(0 0 0 / 75%);",
  textDecoration: "none",
  cursor: "pointer",
});
