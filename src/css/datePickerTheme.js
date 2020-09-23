import { createMuiTheme } from "@material-ui/core";
export default createMuiTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: '#726F6F'
        }
      },
      MuiPickersModal: {
        dialogAction: {
          color: '#FFFFFF',
        },
      },
      MuiPickersDay: {
        daySelected: {
          backgroundColor: '#726F6F'
        }
      },
      MuiPickersYear: {
        yearSelected: {
          color: '#726F6F'
        }
      },
      MuiTypography: {
        color: '#ffffff'
      }
    }
  })