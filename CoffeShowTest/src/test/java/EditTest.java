import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class EditTest {
    WebDriver driver;
    WebDriverWait wait;

    @BeforeEach
    void setUp() {
        driver = new FirefoxDriver();
        WebDriverManager.firefoxdriver().setup();
        driver.get("https://coffee-show.vercel.app/");
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Nested
    @DisplayName("Edit Modal Tests")
    class EditModalTests {

        @Test
        @DisplayName("Should open edit modal after click on editar item button")
        void shouldOpenEditModalAfterClickOnEditarItemButton() {
            WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("update")));
            button.click();
            WebElement modal = driver.findElement(By.id("chakra-modal-:R1qpf6:"));
            assertThat(modal).isNotNull();
        }

        @Test
        @DisplayName("Should close edit modal after click on close button")
        void shouldCloseEditModalAfterClickOnFecharButton(){
            WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.id("update")));
            button.click();
            WebElement modal = driver.findElement(By.id("chakra-modal-:R1qpf6:"));
            WebElement primeiroBotao = modal.findElement(By.tagName("button"));
            primeiroBotao.click();
            assertThrows(NoSuchElementException.class, () -> {
                driver.findElement(By.id("chakra-modal-:R1qpf6:"));
            });
        }
    }
}