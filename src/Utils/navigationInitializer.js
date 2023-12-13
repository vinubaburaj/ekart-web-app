let navigate;

export const initializeNavigation = (navigateFn) => {
  navigate = navigateFn;
}

export const navigateToErrorPage = () => {
  if (navigate) {
    navigate("/error");
  }
}