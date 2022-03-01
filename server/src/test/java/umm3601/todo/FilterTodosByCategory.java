package umm3601.todo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

@SuppressWarnings({ "MagicNumber" })
public class FilterTodosByCategory {
  @Test
  public void findSoftwareDesignTodos() throws IOException {
    TodoDatabase db = new TodoDatabase("/todos.json");
    Todo[] allTodos = db.listTodos(new HashMap<>());

    Todo[] softwareDesignTodos = db.filterTodosByCategory(allTodos, "software design");
    assertEquals(74, softwareDesignTodos.length);
  }

  @Test
  public void listTodosWithCategoryFilter() throws IOException {
    TodoDatabase db = new TodoDatabase("/todos.json");
    Map<String, List<String>> queryParams = new HashMap<>();

    queryParams.put("category", Arrays.asList(new String[] {"software design"}));
    Todo[] softwareDesignTodos = db.listTodos(queryParams);
    assertEquals(74, softwareDesignTodos.length);
  }
}
