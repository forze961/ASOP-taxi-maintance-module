import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';
import dataTreeMenu from '../../scripts/mock-data/treeSideMenu.json';

const data = dataTreeMenu;

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
    paddingTop: 15,
    paddingLeft: 15,
  },
});

let nodePre = {};

function searchTree(element, matchingTitle) {
  if (element.id == matchingTitle) {
    return element;
  } if (element.children != null) {
    let i;
    let result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingTitle);
    }
    return result;
  }
  return null;
}

// eslint-disable-next-line react/prop-types
export default function RecursiveTreeView({ onChoice }) {
  const router = useRouter();
  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.text}
      onClick={() => {
        // This is for redirect between categories
        if (nodes.level === '2') nodePre = searchTree(dataTreeMenu, nodes.parentId);

        // Change user url for correct update page
        if (router.query !== nodes.id.substring(0, 1) && nodes.id !== '1') router.push(`/main/${nodes.id.substring(0, 1)}`, undefined, { shallow: true });

        // If main level - fix this
        if (nodes.level !== '2') {
          nodePre = nodes;
          onChoice(nodes);
        } else {
          // Id inner level (return main level and changy only id)
          onChoice({ ...nodePre, id: nodes.id });
        }
      }}
      style={{ color: '#FEFEFE' }}
    >
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <>
      <Box>
        <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpanded={['root']}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(data)}
        </TreeView>
      </Box>
    </>
  );
}
