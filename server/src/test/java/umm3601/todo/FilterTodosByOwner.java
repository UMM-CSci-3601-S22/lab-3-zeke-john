package umm3601.todo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

public class FilterTodosByOwner {

  @Test
  public void filterTodosByOwner() throws IOException{
    TodoDatabase db = new TodoDatabase("/todos.json");
    Todo[] allTodos = db.listTodos(new HashMap<>());

    Todo[] blancheTodos = db.filterTodosByOwner(allTodos, "Blanche");
    assertEquals(43, blancheTodos.length);
  }

  @Test
  public void listTodosWithOwnerFilter() throws IOException{
    TodoDatabase db = new TodoDatabase("/todos.json");
    Map<String, List<String>> queryParams = new HashMap<>();

    queryParams.put("owner", Arrays.asList(new String[] {"Blanche"}));
    Todo[] BlancheTodos = db.listTodos(queryParams);
    assertEquals(43, BlancheTodos.length, "Incorrect number of todos with owner Blanche.");
  }


}
