package umm3601.todo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

public class FilterTodosByStatus {

  @Test
  public void filterTodosByCompletion() throws IOException {
    TodoDatabase db = new TodoDatabase("/todos.json");
    Todo[] allTodos = db.listTodos(new HashMap<>());

    Todo[] completedTodos = db.filterTodosByStatus(allTodos, "complete");
    assertEquals(143, completedTodos.length);
  }

  @Test
  public void listTodosWithStatusFilter() throws IOException {
    TodoDatabase db = new TodoDatabase("/todos.json");
    Map<String, List<String>> queryParams = new HashMap<>();

    queryParams.put("status", Arrays.asList(new String[] {"complete"}));
    Todo[] completedTodos = db.listTodos(queryParams);
    assertEquals(143, completedTodos.length);
  }
}
