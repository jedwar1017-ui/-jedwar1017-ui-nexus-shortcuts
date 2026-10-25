// Separate digital companions from the software development work list.
import {PROJECTS} from "./catalog.mjs";
export const SOFTWARE_PROJECTS=Object.freeze(PROJECTS.filter(project=>project.id!=="pets"));
export const COMPANIONS=Object.freeze(PROJECTS.filter(project=>project.id==="pets").map(project=>({
  ...project, title:"@Pets Digital Landscape", type:"ChatGPT Digital Companions"
})));
