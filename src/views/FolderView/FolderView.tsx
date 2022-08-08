import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import DashboardElements from "../../components/DashboardElements/DashboardElements";
import vacantFolder from "../../assets/vacantFolder.svg";
import { DataTypes, GlobalTypes } from "../../types/CustomTypes";

import "./folderView.css"; 

const FolderView = (): JSX.Element => {
  
  const { folderId } = useParams();
  let allFoldersHere: DataTypes = {} as DataTypes;
  const eachRecursive = (obj: DataTypes, id: string | undefined) => {
    if (obj.id === id) {
      {
        allFoldersHere = obj;
        return obj;
      }
    }
    for (let iterator in obj.children) {
      eachRecursive(obj.children[iterator], id);
    }
  };

  const data = useSelector(( state: GlobalTypes ) => state.fileFolder);
  eachRecursive(data, folderId);
  if (allFoldersHere.children.length !== 0) {
    return (
      <div>
        <DashboardElements items={allFoldersHere.children} />
      </div>
    );
  }
  return (
    <div className="fc881NotFoundContainer">
      <img className="fc888Image" src={vacantFolder} alt="emptyFolder" />
      <h2>Empty folder</h2>
    </div>
  )
};

export default FolderView;
