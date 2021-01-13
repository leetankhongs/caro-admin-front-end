import { emphasize, withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: theme.spacing(5),
    color: "white",
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.light,
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.primary.light, 0.12),
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591
  
export default StyledBreadcrumb;