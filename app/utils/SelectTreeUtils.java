package utils;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Stack;

import models.TreeModel;

import org.apache.commons.lang.StringUtils;

public class SelectTreeUtils {
	
	public static List<SelectTree> setTree(List<? extends TreeModel> list){
		List<SelectTree> trees = new ArrayList<SelectTree>();
		for(int i =0;i<list.size();i++){
			TreeModel tree = list.get(i);
			SelectTree select = new SelectTree(tree.id,tree.name,tree.pid,tree.cid);
			trees.add(select);
		}
		trees = handleTreeChild(trees);
		trees = webTree(trees);
		return trees;
	}
	
	public static List<SelectTree> handleTreeChild(List<SelectTree> list){
		TreeHandle treeHandle = new TreeHandle(list);
		return treeHandle.handle();
	}
	
	public static List<SelectTree> webTree(List<SelectTree> list){
		Generator gen = new Generator(list);
		return gen.generate();
	}
	
	private static class TreeHandle{
		
		private List<SelectTree> content;
		
		public TreeHandle(List<SelectTree> list) {
			this.content = list;
		}
		
		private List<SelectTree> handle(){
			List<SelectTree> roots = getRoots(content);
			for(SelectTree parent : roots){
				findChild(parent,content);
			}
			return roots;
		}
		
		private List<SelectTree> getRoots(List<SelectTree> content){
			//找父级
			List<SelectTree> roots = new ArrayList<SelectTree>();
			for(SelectTree root : content){
				if(StringUtils.isBlank(root.getPid())||root.getPid().equals("0")){
					roots.add(root);
				}
			}
			return roots;
		}
		
		private void findChild(SelectTree parent,List<SelectTree> content){
			List<SelectTree> child = new ArrayList<SelectTree>();
			for(SelectTree node : content){
				if(node.getPid()!=null&&node.getPid().equals(parent.getCid())){
					child.add(node);
				}
			}
			parent.setChildTree(child);
			
			for(SelectTree c : child){
				findChild(c,content);
			}
		}
	}
	
	private static class Generator {
		
		private List<SelectTree> roots;

		public Generator(List<SelectTree> roots) {
			this.roots = roots;
		}
		
		public List<SelectTree> generate(){
			List<SelectTree> container = new ArrayList<SelectTree>();
			Stack<Boolean> isEndList = new Stack<Boolean>();
			isEndList.add(new Boolean(true));
			for(SelectTree root : roots){
				container = node(container,root,0,isEndList);
			}
			return container;
		}
		
		private List<SelectTree> node(List<SelectTree> container,SelectTree node,int deep,Stack<Boolean> isEndList){
			if(container == null ){
				container = new ArrayList<SelectTree>();
			}
			
			StringBuilder sb = new StringBuilder();
			// 空格列
			if (deep >= 1) {
				sb.append("&nbsp;");
			}
			// 线条列
			for (int i = 1; i < deep; i++) {
				if (!isEndList.get(i)) {
					sb.append("┃");
				} else {
					sb.append("　");
				}
			}
			// 节点列
			if (deep == 0) {
				// 父节点
				sb.append("");
			} else if (isEndList.get(deep)) {
				sb.append("┗");
			} else {
				sb.append("┣");
			}
			sb.append(node.getName());
			node.setSelectTree(sb.toString());
			container.add(node);
			List<SelectTree> cld = node.getChildTree();
			if (cld != null) {
				for(Iterator<SelectTree> it = cld.iterator();it.hasNext();){
					// 入栈
					SelectTree o = it.next();
					isEndList.push(!it.hasNext());
					node(container,o,deep+1,isEndList);
					isEndList.pop();
				}
			}
			return container;
		}
	}
	
}
