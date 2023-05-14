package psf.ucitavanje.obrazaca.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Table(name = "obrazac5")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Getter
@Setter
@Data
public class Obrazac5 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_No",unique = true, nullable = false)
    private Integer Order_No;
    @Column(name = "product_description", nullable = false)
    private String Product_Description;
    @Column(name = "quantity",  nullable = false)
    private Double Quantity;
    @Column(name = "Item_Total", nullable = false)
    private Double Item_Total;
    @Column(name = "sales_category")
    private String Sales_Category;
    @Column(name = "customer_id", nullable = false)
    private Integer Customer_ID;
    @Column(name = "full_name")
    private String Full_Name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Obrazac5 obrazac5 = (Obrazac5) o;
        return Order_No.equals(obrazac5.Order_No) &&
                Product_Description.equals(obrazac5.Product_Description) &&
                Quantity.equals(obrazac5.Quantity) &&
                Item_Total.equals(obrazac5.Item_Total) &&
                Sales_Category.equals(obrazac5.Sales_Category) &&
                Customer_ID.equals(obrazac5.Customer_ID) &&
                Full_Name.equals(obrazac5.Full_Name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Order_No, Product_Description, Quantity, Item_Total, Sales_Category, Customer_ID, Full_Name);
    }
}
