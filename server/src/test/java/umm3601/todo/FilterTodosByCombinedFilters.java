package umm3601.todo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

@SuppressWarnings({ "MagicNumber" })
public class FilterTodosByCombinedFilters {

  @Test
  public void listTodosWithCombinedFilters() throws IOException {
    TodoDatabase db = new TodoDatabase("/todos.json");
    Map<String, List<String>> queryParams = new HashMap<>();

    queryParams.put("owner", Arrays.asList(new String[] {"Blanche"}));
    queryParams.put("category", Arrays.asList(new String[] {"software design"}));

    Todo[] blancheSDTodos = db.listTodos(queryParams);
    assertEquals(14, blancheSDTodos.length);
  }
}
